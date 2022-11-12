import Link from "next/link";
import { Container, ContainerHeader, ContainerScrollableBody } from "../../components/Container";

export default function Page({ params }: { params: { asset: string } }) {
	return (
		<Container>
			<ContainerHeader>{params.asset}</ContainerHeader>
			<ContainerScrollableBody>
				<Link href={"/"}>
					<div className="h-16 bg-green-400 border">Home</div>
				</Link>
			</ContainerScrollableBody>
		</Container>
	);
}
