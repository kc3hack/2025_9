import prisma from "../prisma/client";
import type { PrismaClient } from "@prisma/client";
import { createUUID } from "@/helper/uuid";
import type { Hint } from "@/model/hint";
import { FilterAndTrimEmptyStrings } from "@/helper/dataSanitizer";

class Service {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  private toHintDTO(data: Hint): Hint {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  /**
   * ヒントを複数取得します
   *
   * FIFOの形式でデータは取得されます。そのため、offsetが大きいほど新しいデータが取得されます。
   * limitとoffsetにundefinedを指定すると、デフォルト値が適用されます。
   *
   * @param {number} limit 取得するデータの数
   * @param {number} offset 取得するデータの開始位置
   * @returns {Promise<Hint[]>} ヒントのリスト
   *  */
  // TODO: 複数IDを指定して取得するメソッドを追加する
  async findHints(limit = 10, offset = 0): Promise<Hint[]> {
    const hints = await prisma.hint.findMany({
      take: limit,
      skip: offset,
    });
    return hints.map((hint: Hint) => this.toHintDTO(hint));
  }

  async findHint(id: bigint): Promise<Hint | null> {
    const hint = await prisma.hint.findUnique({
      where: { id: id },
    });
    if (!hint) return null;
    return this.toHintDTO(hint);
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
    return this.toHintDTO(newHint);
  }

  /**
   * 指定されたhintを更新します。
   *
   * PUTメソッドおよびPATCHメソッドとして使用できます。
   *
   * 空文字列または空白のみの文字列が渡されたフィールドは更新されません。
   *
   * タイトルの前後にある空白は削除されます。
   * 例: "   a   " → "a"
   *
   * @param hint 更新対象のhintデータ
   * @returns {Hint} 更新後のhintデータ
   */
  async updateHint(hint: {
    id: bigint;
    title: string;
    content: string;
    image_url: string | null;
  }): Promise<Hint> {
    const validHintData: Partial<Hint> = FilterAndTrimEmptyStrings({
      title: hint.title,
      content: hint.content,
      image_url: hint.image_url,
    });
    const updatedHint = await prisma.hint.update({
      where: { id: hint.id },
      data: validHintData,
    });
    return this.toHintDTO(updatedHint);
  }

  async deleteHint(id: bigint): Promise<Hint> {
    const deletedHint = await prisma.hint.delete({
      where: { id: id },
    });
    return this.toHintDTO(deletedHint);
  }
}

export const HintService = new Service(prisma);
