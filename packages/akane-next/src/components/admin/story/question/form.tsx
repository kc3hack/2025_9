"use client";
import type { Question as DBQuestion } from "@prisma/client";

type AdminStoryQuestionEditFormProps = {
	onSubmitted: (form: FormData) => void;
	data?: {
		storyID: bigint;
		question?: Partial<DBQuestion>;
	};
};

export default function AdminStoryQuestionEditForm({
	data,
	onSubmitted,
}: AdminStoryQuestionEditFormProps) {
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
				<label htmlFor="question-title" className="form-label">
					タイトル
				</label>
				<input
					type="text"
					className="form-control"
					id="question-title"
					name="question-title"
					defaultValue={data?.question?.content}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="question-content" className="form-label">
					内容
				</label>
				<textarea
					className="form-control"
					id="question-content"
					name="question-content"
					rows={3}
					defaultValue={data?.question?.content}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="question-answer" className="form-label">
					回答
				</label>
				<input
					type="text"
					className="form-control"
					id="question-answer"
					name="question-answer"
					defaultValue={data?.question?.answer}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="question-image_url" className="form-label">
					画像URL
				</label>
				<input
					type="text"
					className="form-control"
					id="question-image_url"
					name="question-image_url"
					defaultValue={data?.question?.image_url?.toString()}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="question-priority" className="form-label">
					優先度
				</label>
				<input
					type="number"
					className="form-control"
					id="question-priority"
					name="question-priority"
					defaultValue={data?.question?.priority?.toString() ?? "0"}
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				{data?.question ? "更新" : "作成"}
			</button>
		</form>
	);
}
