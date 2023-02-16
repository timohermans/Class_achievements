import { pb } from "./api";
import {
  AchievementsResponse,
  ClassAchievementsResponse,
  Collections,
  PeopleResponse,
} from "./book-types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export function Achievements() {
  const {
    data: classAchievements,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [Collections.Achievements],
    queryFn: async () => {
      return await pb.collection(Collections.ClassAchievements).getFullList<
        ClassAchievementsResponse<{
          achievement: AchievementsResponse;
          peopleInvolved: PeopleResponse[];
        }>
      >(undefined, {
        expand: "achievement,peopleInvolved",
      });
    },
  });

  if (isLoading) return <p>Loading achievements...</p>;
  if (isError) return <p>Something went wrong loading achievements...</p>;

  return (
    <div className="mx-auto h-screen bg-gradient-to-br from-cyan-500 to-blue-900 p-4">
      <ul className="flex flex-col items-center gap-4 rounded-lg">
        {classAchievements &&
          classAchievements.map((ca) => (
            <li
              className={`w-96 rounded-xl bg-sky-900 p-4 shadow-md ${
                !ca.achievedAt ? "mt-3 rotate-6 opacity-50" : ""
              }`}
              key={ca.id}
            >
              <div className="flex gap-4 ">
                <div className="shrink-0 self-center">
                  <img
                    className="h-14 w-14 rounded-full border-4 border-yellow-400 bg-white p-2 shadow-inner"
                    src={ca.expand?.achievement.iconUrl}
                    alt="icon"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-yellow-200">
                    {ca.expand?.achievement.name}
                  </h2>
                  <div
                    className="mt-2 border-l-4 border-l-slate-200 pl-2 text-sm text-white"
                    dangerouslySetInnerHTML={{
                      __html: ca.expand?.achievement.description ?? "",
                    }}
                  ></div>
                </div>
              </div>

              {ca.achievedAt && (
                <div className="flex">
                  <div className="w-16 self-end text-xs text-white">
                    {dayjs(ca.achievedAt).format("DD/MM")}{" "}
                    {dayjs(ca.achievedAt).format("HH:mm")}
                  </div>
                  <div className="flex-1 text-right text-xs italic text-white">
                    <span>
                      Achieved by <br />
                      {ca.expand?.peopleInvolved
                        ?.map((person) => person.name)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
