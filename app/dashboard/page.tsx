<<<<<<< HEAD
import { Images } from "@/components/components";

export default async function Dashboard() {
  return (
    <>
      <div className="flex flex-row p-2 bg-gray-400 w-5/6 justify-center space-x-10 h-4/5 max-w-screen-2xl">
        <div className="flex justify-center flex-col space-y-10 basis-7/12 bg-stone-600">
          <div className="bg-rose-600 h-5/6 rounded-3xl">
            <Images />
          </div>
          <div className="bg-sky-600 h-1/6 rounded-3xl">Messages</div>
        </div>

        <div className="flex justify-center flex-col space-y-10 basis-5/12 bg-zinc-600">
          <div className="bg-violet-600 h-1/2 rounded-3xl">Appointments</div>
          <div className="bg-emerald-600 h-1/2 rounded-3xl">Calender</div>
        </div>
      </div>
    </>
  );
=======
import { Images } from '@/components/components';

export default async function Dashboard() {
	return (
		<>

			<div className="flex flex-row p-2 bg-gray-400 w-5/6 justify-center space-x-10 h-4/5 max-w-screen-2xl">
				<div className="flex justify-center flex-col space-y-10 basis-7/12 bg-stone-600">
					<div className="bg-rose-600 h-5/6 rounded-3xl">
						<Images />
					</div>
					<div className="bg-sky-600 h-1/6 rounded-3xl">
						Messages
					</div>
				</div>

				<div className="flex justify-center flex-col space-y-10 basis-5/12 bg-zinc-600">
					<div className="bg-violet-600 h-1/2 rounded-3xl">
						Appointments
					</div>
					<div className="bg-emerald-600 h-1/2 rounded-3xl">
						Calender
					</div>
				</div>


			</div>

		</>
	);
>>>>>>> ac550db56788fe34e174526473c413664c423669
}
