// // app/api/abstract/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      title,
      name,
      email,
      alt_email,
      phone,
      country,
      intrested,
      abstract_title,
      upload_abstract_file,
      captchaToken, // Base64-encoded URL of uploaded file
    } = data;

   // Validate captcha token
    if (!captchaToken || typeof captchaToken !== "string" || captchaToken.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Captcha token missing" },
        { status: 400 }
      );
    }

    // 🔍 Verify captcha with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const { data: verification } = await axios.post(verifyUrl);

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: "Invalid captcha verification" },
        { status: 400 }
      );
    }

    const cid = process.env.CID || "";

    // Prepare form data for CMS
    const formData = new FormData();
    formData.append("cid", btoa(cid));
    formData.append("abstract_title", abstract_title);
    formData.append("title", title);
    formData.append("fname", name);
    formData.append("lname", btoa("")); // No last name
    formData.append("country", country);
    formData.append("email", email);
    formData.append("altemail", alt_email);
    formData.append("phone", phone);
    formData.append("abstract_category", intrested);
    formData.append("track", btoa("")); // Optional
    formData.append("postal_details", btoa("")); // Optional
    formData.append("abstract_attachment_url", upload_abstract_file);

    // Include extra fields in additional_info
    // formData.append(
    //   "additional_info",
    //   btoa(
    //     JSON.stringify({
    //       whatsapp_number,
    //       city,
    //       organization,
    //       message,
    //     })
    //   )
    // );

    if (data.other_info) {
      formData.append("additional_info", data.other_info); // already base64-encoded
    }


    const apiRes = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "*/*" },
    });

    if (apiRes.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to submit abstract" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Abstract API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}



