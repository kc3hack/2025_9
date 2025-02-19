import prisma from "../prisma/client";
import { createUuid } from "@/helper/createuuid";
import { Hint } from "@/model/hint";

export async function getHints(): Promise<Hint[]> {
  const hints = await prisma.hint.findMany();
  return hints;
}

export async function createHint(hint: {
  title: string;
  content: string;
  image_url: string | null;
}): Promise<Hint> {
  const id = await createUuid();

  const newHint = await prisma.hint.create({
    data: {
      id: id,
      title: hint.title,
      content: hint.content,
      image_url: hint.image_url,
    },
  });
  return newHint;
}

export async function getHint(id: bigint): Promise<Hint | null> {
  const hint = await prisma.hint.findUnique({
    where: { id: id },
  });
  return hint;
}

export async function updateHint(hint: {
  id: bigint;
  title: string;
  content: string;
  image_url: string | null;
}): Promise<Hint> {
  const updatedHint = await prisma.hint.update({
    where: { id: hint.id },
    data: {
      title: hint.title,
      content: hint.content,
      image_url: hint.image_url,
    },
  });
  return updatedHint;
}

export async function deleteHint(id: bigint): Promise<Hint> {
  const deletedHint = await prisma.hint.delete({
    where: { id: id },
  });
  return deletedHint;
}
