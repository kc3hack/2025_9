import Link from "next/link";

export const AdminNavbar = () => {
	return (
		<nav className="navbar bg-dark">
			<div className="container-fluid">
				<Link href="/admin">
					<span className="navbar-brand mb-0 h1 text-white">
						Akane 管理画面
					</span>
				</Link>
			</div>
		</nav>
	);
};
