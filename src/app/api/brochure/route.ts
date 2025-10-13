// api/brochure 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            first_name,
            email,
            phone,
            country,
            message,
            interested_in,
            modalType,
            captchaToken, // new field
        } = data;

        // 1️⃣ Validate captcha token
        if (!captchaToken || typeof captchaToken !== "string" || captchaToken.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Captcha token missing" },
                { status: 400 }
            );
        }


        const secret = process.env.RECAPTCHA_SECRET_KEY || "";
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`;

        const verifyRes = await fetch(verifyUrl, { method: "POST" });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            return NextResponse.json(
                { success: false, error: "Captcha verification failed" },
                { status: 403 }
            );
        }
        const cid = process.env.CID || '';


        const formType =
            modalType === 'brochure' ? 'brochure_download' : 'scientific_program_download';

        const formData = new FormData();
        formData.append('website_form', btoa(formType));
        formData.append('cid', btoa(cid));
        formData.append('first_name', first_name);
        formData.append('last_name', btoa(''));
        formData.append('email', email);
        formData.append('message', message);
        formData.append('country', country);
        formData.append('phone', phone);

        // const addonInfo = {
        //     interested_in: atob(interested_in), // Optional: decode before stringify
        // };
        // formData.append('additional_info', btoa(JSON.stringify(addonInfo)));
        formData.append('additional_info', btoa(JSON.stringify({
            interested_in: atob(interested_in),
        })));


        const apiRes = await fetch(`${process.env.CMS_URL}`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: '*/*',
            },
        });

        if (apiRes.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to submit form' }, { status: 500 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
