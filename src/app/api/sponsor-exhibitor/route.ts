//app/api/sponsor-exhibitor.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, phone, query, captchaToken } = data;

        // Required fields validation
        if (!name || !email || !phone || !query) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        // Validate captcha token
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
            console.error("Captcha verification failed:", verifyData);
            return NextResponse.json(
                { success: false, error: "Captcha verification failed" },
                { status: 403 }
            );
        }

        const cid = process.env.CID || '';

        const formData = new FormData();
        formData.append('website_form', btoa('sponsors_exhibitor'));
        formData.append('cid', btoa(cid));
        formData.append('first_name', name);
        formData.append('last_name', btoa(''));
        formData.append('email', email);
        formData.append('message', query);
        formData.append('country', btoa(''));
        formData.append('phone', phone);

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



