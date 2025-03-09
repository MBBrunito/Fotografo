import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Definimos el tipo de datos esperados en el POST
interface EventoBody {
   nombre: string;
   descripcion: string;
}

export async function POST(req: NextRequest) {
   try {
      const body: EventoBody = await req.json(); // Tipo explícito

      const evento = await prisma.evento.create({
         data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
         },
      });

      return NextResponse.json(evento, { status: 201 }); // ✅ Usa NextResponse
   } catch (error) {
      return NextResponse.json(
         { error: "Error al crear el evento" },
         { status: 500 }
      );
   }
}

export async function GET() {
   try {
      const eventos = await prisma.evento.findMany({
         orderBy: { fecha: "desc" },
      });

      return NextResponse.json(eventos, { status: 200 }); // ✅ Usa NextResponse
   } catch (error) {
      return NextResponse.json(
         { error: "Error al obtener eventos" },
         { status: 500 }
      );
   }
}
