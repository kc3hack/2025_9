"use client";
import type { Hint as DBHint } from "@prisma/client";

type AdminStoryQuestionHintEditFormProps = {
  onSubmitted: (form: FormData) => void;
  data?: {
    storyID: bigint;
    questionID: bigint | undefined;
    hint?: Partial<DBHint>;
  };
};

export default function AdminStoryQuestionHintEditForm({
  data,
  onSubmitted,
}: AdminStoryQuestionHintEditFormProps) {
  return (
    <form action={onSubmitted}>
      <div className="mb-3">
        <label htmlFor="question-story-id" className="form-label">
          ストーリーID
        </label>
        <input
          type="text"
          className="form-control"
          id="question-story-id"
          name="question-story-id"
          value={data?.storyID?.toString()}
          disabled={data?.storyID !== undefined}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="hint-title" className="form-label">
          タイトル
        </label>
        <input
          type="text"
          className="form-control"
          id="question-title"
          name="question-title"
          defaultValue={data?.hint?.content}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="hint-content" className="form-label">
          内容
        </label>
        <textarea
          className="form-control"
          id="question-content"
          name="question-content"
          rows={3}
          defaultValue={data?.hint?.content}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="hint-image_url" className="form-label">
          画像URL
        </label>
        <input
          type="text"
          className="form-control"
          id="question-image_url"
          name="question-image_url"
          defaultValue={data?.hint?.image_url?.toString()}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {data?.hint ? "更新" : "作成"}
      </button>
    </form>
  );
}
