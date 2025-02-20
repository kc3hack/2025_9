import prisma from "../prisma/client";
import type { PrismaClient } from "@prisma/client";
import { createUUID } from "@/helper/uuid";
import { Hint } from "@/model/hint";

class Service {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  private mapToHintDTO(data: Hint): Hint {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  // limit: 取得するデータの数
  // offset: 取得するデータの開始位置
  // TODO: 複数IDを指定して取得するメソッドを追加する
  async findHints(limit: number = 10, offset: number = 0): Promise<Hint[]> {
    // FIFOの形式でデータは取得される
    // offsetが大きいほど新しいでデータが取得される
    const hints = await prisma.hint.findMany({
      take: limit,
      skip: offset,
    });
    return hints.map((hint: Hint) => this.mapToHintDTO(hint));
  }

  async findHint(id: bigint): Promise<Hint | null> {
    const hint = await prisma.hint.findUnique({
      where: { id: id },
    });
    if (!hint) return null;
    return this.mapToHintDTO(hint);
  }

  async createHint(hint: {
    title: string;
    content: string;
    image_url: string | null;
  }): Promise<Hint> {
    const id = await createUUID();

    const newHint = await prisma.hint.create({
      data: {
        id: id,
        title: hint.title,
        content: hint.content,
        image_url: hint.image_url,
      },
    });
    return this.mapToHintDTO(newHint);
  }

  async updateHint(hint: {
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
    return this.mapToHintDTO(updatedHint);
  }

  async deleteHint(id: bigint): Promise<Hint> {
    const deletedHint = await prisma.hint.delete({
      where: { id: id },
    });
    return this.mapToHintDTO(deletedHint);
  }
}

export const HintService = new Service(prisma);
