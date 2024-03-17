"use client";
import AddNewGroup from "@/components/addNewGroup";
import DashTable from "@/components/dashTable";
import NoNumberVerifiedAlert from "@/components/NoNumberVerifiedAlert";
import { useCurrentUser } from "@/hook/current-user-session";
const page = () => {
	const user = useCurrentUser();
	return (
		<div className="pl-9 ">
			<div className="md:flex max-w-[90vw] w-full">
				<div>
					<div className="text-3xl pb-2">Your Group</div>
					<p className="text-xl">Here you can see and add new groups </p>
				</div>
				<div className="ml-auto sm:mt-3 md:mt-0">
					{user?.phoneNumber ? (
						<AddNewGroup></AddNewGroup>
					) : (
						<NoNumberVerifiedAlert></NoNumberVerifiedAlert>
					)}
				</div>
			</div>
			<div className="shadow-xl h-[80vh] my-4 md:mx-[15vw] sm:mx-[5vw] p-4">
				<DashTable></DashTable>
			</div>
		</div>
	);
};

export default page;
