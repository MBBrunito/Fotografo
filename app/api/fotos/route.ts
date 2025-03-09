import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Definir tipos para el body del POST
interface FotoBody {
   url: string;
   eventoId: string; // Prisma usa strings para IDs UUID
   subidaPor: string;
}

export async function POST(req: NextRequest) {
   try {
      const body: FotoBody = await req.json(); // ✅ Tipo explícito

      const foto = await prisma.foto.create({
         data: {
            url: body.url,
            eventoId: body.eventoId,
            subidaPor: body.subidaPor,
         },
      });

      return NextResponse.json(foto, { status: 201 }); // ✅ Usa NextResponse
   } catch (error) {
      return NextResponse.json(
         { error: "Error al subir la foto" },
         { status: 500 }
      );
   }
}

export async function GET(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const eventoId = searchParams.get("eventoId");

      if (!eventoId) {
         return NextResponse.json(
            { error: "Se requiere eventoId" },
            { status: 400 }
         );
      }

      const fotos = await prisma.foto.findMany({
         where: { eventoId },
         orderBy: { creadoEn: "desc" },
      });

      return NextResponse.json(fotos, { status: 200 }); // ✅ Usa NextResponse
   } catch (error) {
      return NextResponse.json(
         { error: "Error al obtener fotos" },
         { status: 500 }
      );
   }
}
