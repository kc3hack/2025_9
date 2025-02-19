import prisma from "../prisma/client";
import { Hint as ResponseHint } from "@prisma/client";

type createHintContents = {
  title: string;
  content: string;
  image_url: string | null;
};

type updateHintContents = createHintContents & {
  id: bigint;
};

export async function getHints(): Promise<ResponseHint[]> {
  const hints = await prisma.hint.findMany();
  return hints;
}

export async function createHint(
  hint: createHintContents
): Promise<ResponseHint> {
  const [{ id }] = await prisma.$queryRaw<
    Array<{ id: bigint }>
  >`SELECT UUID_SHORT() as id`;

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

export async function getHint(id: bigint): Promise<ResponseHint | null> {
  const hint = await prisma.hint.findUnique({
    where: { id: id },
  });
  return hint;
}

export async function updateHint(
  hint: updateHintContents
): Promise<ResponseHint> {
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

export async function deleteHint(id: bigint): Promise<ResponseHint> {
  const deletedHint = await prisma.hint.delete({
    where: { id: id },
  });
  return deletedHint;
}
