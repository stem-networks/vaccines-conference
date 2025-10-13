"use client";

import React, { useState, useRef } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { ApiResponse, IndexPageData } from "@/types";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  // category: string;
  captchaToken?: string;
};

type FormErrorType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  captchaToken?: string;
};

type CommunityFormData = {
  email: string;
  fname: string;
  lname: string;
  // category: string;
  commCaptchaToken?: string; // NEW
};

type CommunityFormErrors = {
  email?: string;
  fname?: string;
  lname?: string;
  commCaptchaToken?: string; // NEW
};

interface VolunteerCommunityProps {
  generalVolunteerInfo: ApiResponse;
  onelinerVolunteerInfo: IndexPageData;
}

// Generate random BODMAS expression
// const generateRandomMathExpression = (): {
//   expression: string;
//   correctAnswer: string;
// } => {
//   const operations = ["+", "-", "*"];
//   const randomOperation =
//     operations[Math.floor(Math.random() * operations.length)];

//   const num1 = Math.floor(Math.random() * 10) + 1;
//   const num2 = Math.floor(Math.random() * 10) + 1;
//   const num3 = Math.floor(Math.random() * 10) + 1;

//   const useParentheses = Math.random() < 0.5;
//   let expression: string;

//   if (useParentheses) {
//     expression = `(${num1} ${randomOperation} ${num2}) ${randomOperation} ${num3}`;
//   } else {
//     expression = `${num1} ${randomOperation} ${num2} ${randomOperation} ${num3}`;
//   }

//   const correctAnswer = eval(expression).toFixed(2); // returns string
//   return { expression, correctAnswer };
// };

const VolunteerCommunity: React.FC<VolunteerCommunityProps> = ({
  generalVolunteerInfo,
  onelinerVolunteerInfo,
}) => {
  const general = generalVolunteerInfo?.data || {};
  const onelinerAbstract =
    onelinerVolunteerInfo?.oneliner?.Be_A_Volunteer?.content;

  // Modal for vounteer
  const [showModal, setShowModal] = useState(false);
  // const [mathExpression, setMathExpression] = useState("");
  // const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  // const [userAnswer, setUserAnswer] = useState("");
  // const [error, setError] = useState(""); // For general errors
  const [showModal3, setShowModal3] = useState(false); // For success modal
  const [submittingVolunteer, setSubmittingVolunteer] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    captchaToken: "",
  });
  const volcaptchaRef = useRef<ReCAPTCHA>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // const captchaRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // form for discover community
  const [submitting, setSubmitting] = useState(false);

  const [communityFormData, setCommunityFormData] = useState<CommunityFormData>(
    {
      email: "",
      fname: "",
      lname: "",
      commCaptchaToken: "", // NEW: store recaptcha token
    }
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [communityFormErrors, setCommunityFormErrors] =
    useState<CommunityFormErrors>({});
  const [showModal2, setShowModal2] = useState(false);

  // Form for Discover Community

  const validateCommunityForm = (): CommunityFormErrors => {
    const errors: CommunityFormErrors = {};

    if (!communityFormData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(communityFormData.email)) {
      errors.email = "Email address is invalid";
    } else if (!communityFormData.fname) {
      errors.fname = "First name is required";
    } else if (!communityFormData.lname) {
      errors.lname = "Last name is required";
    } else if (!communityFormData.commCaptchaToken) {
      errors.commCaptchaToken = "Please verify you are not a robot";
    }

    return errors;
  };

  // UTF-8 safe Base64 encoder
  function utf8ToBase64(str: string) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  }

  const handleCommunitySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitting(true);
    const errors = validateCommunityForm();
    setCommunityFormErrors(errors); // Always set errors

    if (Object.keys(errors).length === 0) {
      try {
        // const fullName = `${communityFormData.fname} ${communityFormData.lname}`;
        // await axios.post("/api/community-submit", {
        //   name: fullName,
        //   email: communityFormData.email,
        //   category: communityFormData.category,
        // });

        const fullName = `${communityFormData.fname} ${communityFormData.lname}`.trim();
        const payload = {
          enquiryname: utf8ToBase64(fullName.trim()),
          enquiryemail: utf8ToBase64(communityFormData.email.trim()),
          enquiryquery: utf8ToBase64(""),
          commCaptchaToken: communityFormData.commCaptchaToken, // send captcha token to API
        };

        const response = await fetch("/api/community-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setShowModal2(true);
          setCommunityFormData({
            email: "",
            fname: "",
            lname: "",
            commCaptchaToken: ""
          });
          recaptchaRef.current?.reset();
          setCommunityFormErrors({}); // Clear previous errors
        } else {
          const errorDataCom = await response.json();
          toast.error(errorDataCom?.error || "Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting community form:", error);
      } finally {
        setSubmitting(false); // Stop submitting
      }
    } else {
      // Focus and toast the first field that has an error
      const order = ["email", "fname", "lname", "commCaptchaToken"];
      for (const field of order) {
        if (errors[field as keyof CommunityFormErrors]) {
          toast.error(errors[field as keyof CommunityFormErrors]!);
          document.getElementById(`community-${field}`)?.focus();
          break;
        }
      }
      setSubmitting(false);
    }
  };

  // validation of volunteer form

  const validateForm = (): FormErrorType => {
    const errors: FormErrorType = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    } else if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!formData.captchaToken) {
      errors.captchaToken = "Please verify you are not a robot";
    }

    return errors;
  };

  // Submit for Volunteer
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors); // Always set inline errors

    const fieldOrder = ["firstName", "lastName", "email", "captchaToken"];

    // Show toast + focus only for first error
    for (const field of fieldOrder) {
      if (errors[field as keyof typeof errors]) {
        toast.error(errors[field as keyof typeof errors] as string);

        // Focus the relevant field
        switch (field) {
          case "firstName":
            firstNameRef.current?.focus();
            break;
          case "lastName":
            lastNameRef.current?.focus();
            break;
          case "email":
            emailRef.current?.focus();
            break;
          // case "captchaToken":
          //   volcaptchaRef.current?.focus();
          //   break;
        }

        return;
      }
    }

    // Check captcha separately
    // if (parseFloat(userAnswer) !== parseFloat(correctAnswer || "0")) {
    //   const captchaError = "Incorrect answer. Please try again.";
    //   toast.error(captchaError);
    //   setFormErrors({ ...errors, userAnswer: captchaError });
    //   captchaRef.current?.focus();
    //   return;
    // }

    setSubmittingVolunteer(true);

    // Submit form
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const payload = {
        enquiryname: utf8ToBase64(fullName.trim()),
        enquiryemail: utf8ToBase64(formData.email.trim()),
        enquiryquery: utf8ToBase64(""),
        captchaToken: formData.captchaToken,
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        setShowModal3(true);

        // Clear everything
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          captchaToken: "",
        });
        volcaptchaRef.current?.reset();
        setFormErrors({});
        // setError("");
      } else {
        const errorData = await response.json();
        toast.error(errorData?.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setSubmittingVolunteer(false)
    }
  };

  const handleSuccess = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowModal2(false);
    setShowModal3(false);
    // setShowModal5(false);
    // setError("");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // const refreshCaptcha = () => {
  //   const { expression, correctAnswer } = generateRandomMathExpression();
  //   setMathExpression(expression);
  //   setCorrectAnswer(correctAnswer);
  //   // Optionally clear input field
  //   // setUserAnswer('');
  // };

  return (
    <div>
      <div
        className="volue_wrap"
        style={{ backgroundImage: `url('/images/images/bg2.webp')` }}
      >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-7 amr_wrap15">
              <div className="box_wrap155"></div>

              <div
                className="volu_wrap wow fadeInUp"
                data-wow-delay="300ms"
                data-wow-duration="1000ms"
              >
                <h3>Be A Volunteer</h3>
              </div>

              <div
                className="box_wrap_add1 wow fadeInUp"
                data-wow-delay="400ms"
                data-wow-duration="1000ms"
              >
                <h3
                  dangerouslySetInnerHTML={{ __html: onelinerAbstract || "" }}
                />
              </div>

              <div className="box_wrap154"></div>

              <div
                className="apple_wrap wow fadeInUp"
                data-wow-delay="500ms"
                data-wow-duration="1000ms"
              >
                <button
                  type="button"
                  title="Apply Now"
                  className="apply-now-btn"
                  id="volunteerapplybtn"
                  onClick={toggleModal}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="cont_wrap_add  wow fadeInUp"
        data-wow-delay="600ms"
        data-wow-duration="1000ms"
      >
        <div className="auto-container clearfix">
          <div className="row clearfix">
            <div className="col-md-9 mar_wrap1579">
              <div className="call_cont_st1">
                <div className="wr_sty1">
                  <div className="logo_cont15 wow fadeInUp" data-wow-delay="700ms" data-wow-duration="1000ms">
                    <Image
                      src="/images/images/logo-hd-1.svg"
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                      width={200}
                      height={80}
                    />
                  </div>
                  <div className="cont_head_st1 wow fadeInUp" data-wow-delay="800ms" data-wow-duration="1000ms">
                    <h3>
                      Discover Whats Next in{" "}
                      {general.clname ? general.clname : ""}
                    </h3>
                    <p>
                      Join our community today for the latest news, exclusive
                      interviews, and unique insights from world-renowned
                      speakers and experts.
                    </p>
                  </div>
                  <form
                    id="joinourcommunityform"
                    onSubmit={handleCommunitySubmit}
                    className="wow fadeInUp" data-wow-delay="900ms" data-wow-duration="1000ms"
                  >
                    <div className="row">
                      <div className="col-md-12 cont_wrap14666">
                        <label>Email Address:*</label>
                        <input
                          name="email"
                          id="community-email"
                          type="email"
                          placeholder="Enter Email"
                          disabled={submitting}
                          value={
                            communityFormData ? communityFormData.email : ""
                          }
                          autoComplete="off"
                          // onChange={handleCommunityChange}
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              email: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors
                          ? communityFormErrors.email && (
                            <div
                              id="joinourcommunityemail-error"
                              style={{ color: "red" }}
                            >
                              {communityFormErrors
                                ? communityFormErrors.email
                                : ""}
                            </div>
                          )
                          : ""}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>First Name:*</label>
                        <input
                          name="fname"
                          id="community-fname"
                          type="text"
                          placeholder="Enter First Name"
                          value={
                            communityFormData ? communityFormData.fname : " "
                          }
                          disabled={submitting}
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              fname: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors
                          ? communityFormErrors.fname && (
                            <div id="jocfname-error" style={{ color: "red" }}>
                              {communityFormErrors
                                ? communityFormErrors.fname
                                : ""}
                            </div>
                          )
                          : ""}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>Last Name:*</label>
                        <input
                          name="lname"
                          id="community-lname"
                          type="text"
                          placeholder="Enter Last Name"
                          disabled={submitting}
                          value={
                            communityFormData ? communityFormData.lname : ""
                          }
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              lname: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors.lname && (
                          <div id="joclname-error" style={{ color: "red" }}>
                            {communityFormErrors
                              ? communityFormErrors.lname
                              : ""}
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 mt-3 recaptcha-wrapper">
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} // your site key
                          onChange={(token) => setCommunityFormData({ ...communityFormData, commCaptchaToken: token || "" })}
                          onExpired={() => setCommunityFormData({ ...communityFormData, commCaptchaToken: "" })} // add this
                          ref={recaptchaRef}
                          size="normal"
                          theme="light"
                        />
                        {communityFormErrors.commCaptchaToken && (
                          <p style={{ color: "red" }}>{communityFormErrors.commCaptchaToken}</p>
                        )}
                      </div>

                      <div className="col-md-12">
                        <div className="sbtn">
                          <input
                            type="submit"
                            name="submit"
                            value={submitting ? "Submitting..." : "Submit"}
                            title="Submit"
                            className="appy15"
                            id="joinourcommunitysubmitbtn"
                            disabled={submitting}
                          />
                        </div>
                        <input
                          type="hidden"
                          name="category"
                          value="joinourcommunity"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="wr_sty2 wow-fadeInUp" data-wow-delay="1000ms" data-wow-duration="1000ms">
                  <div className="img_wrap156">
                    <Image
                      src="/images/images/mess1.png"
                      className="mess15"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                    <span className="jum55">
                      {general.full_length_dates
                        ? general.full_length_dates
                        : ""}
                    </span>
                    <Image
                      src="/images/images/mess2.png"
                      className="mess16"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                    <span className="jum56">
                      {general.venue_p1 ? general.venue_p1 : ""}
                    </span>
                    <span className="jum57">
                      <Image
                        src="/images/images/ph.png"
                        width={100}
                        height={100}
                        alt={general.clname ? general.clname : ""}
                        title={general.clname ? general.clname : ""}
                        loading="lazy"
                      />{" "}
                      <Link
                        href={`tel:${general?.phone}`}
                        className=""
                        title={general?.phone}
                      >
                        {general?.phone}
                      </Link>
                    </span>
                    <Image
                      src="/images/images/mess.png"
                      className="img15444"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal2" id="myModal" role="dialog">
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="material-icons"
                    style={{ marginBottom: "35px" }}
                  >
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">Volunteer</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  style={{ fontSize: "30px" }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <label>Email Address:*</label>
                      <input
                        ref={emailRef}
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        value={formData.email}
                        disabled={submittingVolunteer}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {formErrors.email && (
                        <p style={{ color: "red" }}>{formErrors.email}</p>
                      )}
                    </div>
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>First Name:*</label>
                        <input
                          type="text"
                          ref={firstNameRef}
                          name="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          disabled={submittingVolunteer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {formErrors.firstName && (
                          <p style={{ color: "red" }}>{formErrors.firstName}</p>
                        )}
                      </div>
                      <div className="col-6 test2">
                        <label>Last Name:*</label>
                        <input
                          type="text"
                          ref={lastNameRef}
                          name="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          disabled={submittingVolunteer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {formErrors.lastName && (
                          <p style={{ color: "red" }}>{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <p>
                        Verify you’re human: What is <b>{mathExpression}</b>?
                      </p>
                      <input
                        type="text"
                        ref={captchaRef}
                        placeholder="Enter your answer"
                        value={userAnswer}
                        disabled={submittingVolunteer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      {formErrors.userAnswer && (
                        <p style={{ color: "red" }}>{formErrors.userAnswer}</p>
                      )}
                      <button
                        type="button"
                        title="Refresh Captcha"
                        onClick={refreshCaptcha}
                        className="btn btn-secondary mt-2"
                      >
                        Refresh Captcha
                      </button>
                    </div> */}

                    <div className="col-12 mt-3 volunteer-captcha recaptcha-wrapper">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} // your site key
                        onChange={(token) => setFormData({ ...formData, captchaToken: token || "" })}
                        onExpired={() => setFormData({ ...formData, captchaToken: "" })} // add this
                        ref={volcaptchaRef}
                        size="normal"
                        theme="light"
                      />
                      {formErrors.captchaToken && (
                        <p style={{ color: "red" }}>{formErrors.captchaToken}</p>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      title="Submit"
                      className="btn btn-success btn-block"
                      disabled={submittingVolunteer}
                    >
                      {submittingVolunteer ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal2 && (
        <div className="modal" id="myModal" role="dialog">
          <div
            className="modal-dialog modal-confirm fade-in"
            role="document"
            ref={modalRef}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="material-icons"
                    style={{ marginBottom: "35px" }}
                  >
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">
                  Thank you for subscribing!
                </h4>
                <p>
                  You’ll be hearing from us soon with exciting updates and
                  exclusive content.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={handleSuccess}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal3 && (
        <div className="modal" id="myModal" role="dialog">
          <div
            className="modal-dialog modal-confirm fade-in"
            role="document"
            ref={modalRef}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="material-icons"
                    style={{ marginBottom: "35px" }}
                  >
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">
                  Form submitted successfully!
                </h4>
                <p>
                  Thank you for your submission. We will get back to you
                  shortly.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={handleSuccess}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCommunity;
