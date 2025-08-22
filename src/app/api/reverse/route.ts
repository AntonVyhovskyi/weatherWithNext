import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });

    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { lat, lon, format: "json", "accept-language": "en" },
            headers: { "User-Agent": "Next.js App (vygovskijanton1@gmail.com)" }
        });
        return NextResponse.json(response.data);
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            return NextResponse.json({
                error: err.response?.data || err.message
            }, { status: err.response?.status || 500 });
        }
    }
}