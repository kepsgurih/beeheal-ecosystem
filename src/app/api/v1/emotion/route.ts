import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Emotion from '@/models/emotion';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
    const user = await currentUser()
    await connectMongoDB();
    try {
        if (!user) {
            return NextResponse.json({ message: 'Gagal membaca emosi user' }, { status: 503 });
        }
        if (user.privateMetadata.role !== 'admin' && user.privateMetadata.role !== 'stakeholder') {
            return NextResponse.json({ message: 'Anda tidak memiliki ijin untuk mengakses halaman ini!' }, { status: 403 });
        }
        const emotions = await Emotion.find({});
        return NextResponse.json(emotions);
    } catch (error) {
        console.error('emotion fetch', error)
        return NextResponse.json({ message: 'Server tidak bisa diakses, hubungi penyedia layanan!' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const user = await currentUser();
    await connectMongoDB();

    try {
        const { emotionType } = await req.json();
        if (!user) {
            return NextResponse.json({ message: 'Gagal membaca emosi user' }, { status: 503 });
        }
        if (typeof emotionType !== 'number' || emotionType < 1 || emotionType > 5) {
            return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingEmotionToday = await Emotion.findOne({
            userId: user.id,
            createdDate: { $gte: today }
        });

        if (existingEmotionToday) {
            return NextResponse.json({ message: 'Anda hanya bisa input emosi sekali sehari' }, { status: 403 });
        }
        const newEmotion = new Emotion({
            userId: user.id,
            avatar: user.imageUrl,
            fullName: `${user.firstName} ${user.lastName}`,
            emotionType,
            createdDate: new Date(),
            updatedDate: new Date(),
        });

        await newEmotion.save();
        return NextResponse.json({ message: 'Berhasil input emosi' }, { status: 201 });
    } catch (error) {
        console.error('emotion post', error)
        return NextResponse.json({ message: 'Server tidak bisa diakses, hubungi penyedia layanan!' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const user = await currentUser();
    await connectMongoDB();

    try {
        const { id, emotionType } = await req.json();
        if (!user) {
            return NextResponse.json({ message: 'Gagal membaca emosi user' }, { status: 503 });
        }
        const existingEmotion = await Emotion.findOne({ _id: id, userId: user.id });

        if (!existingEmotion) {
            return NextResponse.json({ message: 'Emotion not found or access denied' }, { status: 404 });
        }
        existingEmotion.emotionType = emotionType;
        existingEmotion.updatedDate = new Date();
        await existingEmotion.save();

        return NextResponse.json({ message: 'Berhasil mengubah emosi' }, { status: 200 });
    } catch (error) {
        console.error('emotion put', error)
        return NextResponse.json({ message: 'Server tidak bisa diakses, hubungi penyedia layanan!' }, { status: 500 });
    }
}