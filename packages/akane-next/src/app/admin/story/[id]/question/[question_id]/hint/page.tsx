import AdminHeader from "@/components/admin/header";
import AdminStoryQuestionHintEditForm from "@/components/admin/story/question/hint/form";
import { firstOrSelf } from "@/helper/array";
import { AsBigInt } from "@/helper/bigint";
import { redirect } from "next/navigation";
import { getHintFromFormData } from "../../../../util";
import { HintService } from "@/services/hintService";

export default async function AdminStoryQuestionHintPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: bigint; question_id: bigint }>;
  searchParams: Promise<{
    [question_id: string]: string | string[] | undefined;
  }>;
}) {
  const storyID = (await params).id;
  const questionID = (await params).question_id;
  const hintID = AsBigInt(firstOrSelf((await searchParams).question_id));
  const hint =
    hintID !== undefined
      ? (await HintService.findHint(hintID)) ?? undefined
      : undefined;

  const onSubmit = async (form: FormData) => {
    "use server";
    const rawHint = getHintFromFormData(form);
    const hint = await HintService.createHint(rawHint);
    if ("error" in hint) {
      console.error(hint.error);
      return;
    }
    redirect(`/admin/story/${storyID}/question/${questionID}/`);
  };

  return (
    <>
      <AdminHeader
        title="問いのヒントを作成"
        parents={[
          { name: "管理画面", href: "/admin" },
          { name: "ストーリー管理", href: "/admin/story" },
          {
            name: storyID.toString(),
            href: `/admin/story/${storyID.toString()}`,
          },
          { name: "問題管理" },
        ]}
      />

      <AdminStoryQuestionHintEditForm
        onSubmitted={onSubmit}
        data={{
          storyID: storyID,
          questionID: questionID,
          hint: hint,
        }}
      />
    </>
  );
}
