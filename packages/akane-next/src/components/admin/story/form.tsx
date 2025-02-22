"use client";
import type { Story as DBStory } from "@prisma/client";

type Props = {
	story?: DBStory;
	onSubmitted: (formData: FormData) => void;
};

export default function AdminStoryEditForm({ story, onSubmitted }: Props) {
	return (
		<form action={onSubmitted}>
			<div className="mb-3">
				<label htmlFor="story-title" className="form-label">
					タイトル
				</label>
				<input
					type="text"
					className="form-control"
					id="story-title"
					name="story-title"
					placeholder="なんもわからん関西の謎"
					value={story?.title}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="story-content" className="form-label">
					内容
				</label>
				<textarea
					className="form-control"
					id="story-content"
					name="story-content"
					rows={3}
					value={story?.content}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="story-image_url" className="form-label">
					画像URL
				</label>
				<input
					type="text"
					className="form-control"
					id="story-image_url"
					name="story-image_url"
					placeholder="https://example.com/image.jpg"
					value={story?.image_url?.toString()}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="story-type" className="form-label">
					種類
				</label>
				<select
					className="form-select"
					id="story-type"
					name="story-type"
					value={story?.type}
					required
				>
					<option value="long">長編</option>
					<option value="short">短編</option>
				</select>
			</div>

			<div className="mb-3">
				<label htmlFor="story-status" className="form-label">
					ステータス
				</label>
				<select
					className="form-select"
					id="story-status"
					name="story-status"
					value={story?.status}
					required
				>
					<option value="draft">下書き</option>
					<option value="published">公開</option>
				</select>
			</div>

			<div className="mb-3">
				<label htmlFor="story-difficulty" className="form-label">
					難易度
				</label>
				<select
					className="form-select"
					id="story-difficulty"
					name="story-difficulty"
					value={story?.difficulty}
					required
				>
					<option value="1">★☆☆☆☆</option>
					<option value="2">★★☆☆☆</option>
					<option value="3">★★★☆☆</option>
					<option value="4">★★★★☆</option>
					<option value="5">★★★★★</option>
				</select>
			</div>

			<div className="mb-3">
				<label htmlFor="story-estimated_time" className="form-label">
					推定所要時間（分）
				</label>
				<input
					type="number"
					className="form-control"
					id="story-estimated_time"
					name="story-estimated_time"
					placeholder="60"
					value={story?.estimated_time?.toString()}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="story-area" className="form-label">
					エリア
				</label>
				<input
					type="text"
					className="form-control"
					id="story-area"
					name="story-area"
					placeholder="関西"
					value={story?.area}
					required
				/>
				<div className="form-text">
					「大阪城付近」などの具体的な場所を入力してください。
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="story-latitude" className="form-label">
					緯度
				</label>
				<input
					type="number"
					className="form-control"
					id="story-latitude"
					name="story-latitude"
					placeholder="34.985990520884535"
					value={story?.latitude?.toString()}
					required
				/>
				<div className="form-text">
					緯度は Google マップなどからコピーしてきてください。
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="story-longitude" className="form-label">
					経度
				</label>
				<input
					type="number"
					className="form-control"
					id="story-longitude"
					name="story-longitude"
					placeholder="135.75889251509875"
					value={story?.longitude?.toString()}
					required
				/>
				<div className="form-text">
					経度は Google マップなどからコピーしてきてください。
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="story-radius" className="form-label">
					座標からの半径距離（m）
				</label>
				<input
					type="number"
					className="form-control"
					id="story-radius"
					name="story-radius"
					placeholder="100"
					value={story?.radius?.toString()}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="story-pin_class" className="form-label">
					ピンのアイコンクラス
				</label>
				<input
					type="text"
					className="form-control"
					id="story-pin_class"
					name="story-pin_class"
					placeholder="fas fa-map-marker-alt"
					value={story?.pin_class?.toString()}
				/>
				<div className="form-text">
					ピンのアイコンクラスを入力してください。
				</div>
			</div>

			<button type="submit" className="btn btn-primary">
				作成
			</button>
		</form>
	);
}
