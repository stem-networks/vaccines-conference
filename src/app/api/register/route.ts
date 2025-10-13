// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {

  // UTF-8 safe Base64 encoder
  function utf8ToBase64(str: string) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  }

  try {
    const data = await req.json();
    const { captchaToken } = data;

    //  Validate captcha token
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

    const formData = new FormData();
    formData.append("or", "1");
    formData.append("cid", data.cid || utf8ToBase64(cid));
    formData.append("title", data.title);
    formData.append("fname", data.name);
    formData.append("lname", utf8ToBase64(""));
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("altemail", data.alt_email); // FIXED
    formData.append("phone", data.phone);
    formData.append("whatsapp_number", data.whatsapp_number); // FIXED
    formData.append("institution", data.institution);
    formData.append("no_of_participants", data.no_of_participants);
    formData.append("no_of_accompanying", data.no_of_accompanying);
    formData.append("amount", data.final_amt_input);
    formData.append("registration_type", data.reg_category);
    formData.append("registration_fee_per_participant", data.reg_tot_hidden);
    formData.append("accompanying_fee", data.price_of_each_accompanying);
    formData.append("accommodation_occupancy_type", data.occupency_text);
    formData.append("accommodation_fee_per_night", data.occupancy);
    formData.append("check_in_date", data.check_insel);
    formData.append("check_out_date", data.check_outsel);
    formData.append("number_of_nights", data.nights);
    formData.append("accommodation_fee", data.accommodation_fee || data.occupancy); // FIXED
    formData.append("web_token", data.web_token); // ADDED
    // formData.append("additional_info", btoa(JSON.stringify({ description: atob(data.description || "") })));

    const apiRes = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: formData,
    });

    const result = await apiRes.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while submitting the form." },
      { status: 500 }
    );
  }
}
