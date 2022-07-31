import { Avatar, AvatarGroup } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";
import _ from "lodash";
import { createSelector } from "reselect";

const activeThisMonthSelector = createSelector(
  (state) => state.users, // ===
  // state => state.activeMonth
  (users /* activeMonth */) =>
    users.filter((i) => i.lastActiveDate.includes("2022-05"))
);

function ActiveAuthors() {
  const activeThisMonth = useSelector(
    activeThisMonthSelector
    // (state) => state.users.filter((i) => i.lastActiveDate.includes("2022-05"))
    // (prev, next) => _.isEqual(prev, next)
  );

  // const activeThisMonth = useMemo(
  //   () => users.filter((i) => i.lastActiveDate.includes("2022-05")),
  //   [users /*...*/]
  // );

  // const activeThisMonthCount = useSelector(
  //   (state) =>
  //     state.users.filter((i) => i.lastActiveDate.includes("2022-05")).length // → number,
  // );
  // const activeThisMonthNames = useSelector(
  //   (state) =>
  //     state.users
  //       .filter((i) => i.lastActiveDate.includes("2022-05"))
  //       .map((i) => i.name)
  //       .join(", ") // → string
  // );

  console.time("deepEqual");
  _.isEqual(activeThisMonth, [...activeThisMonth]);
  console.timeEnd("deepEqual");
  // users[0].email -> ...
  // users[0].id -> ...

  // → narrow the selector(s) down to what we need in the component → return the plain value
  //  → prevents rerenders when the users change (but the values we actually care about don't)
  //  → ===
  // → reselect

  useEffect(() => {
    console.log("mounted");
  }, []);
  const [meal, setMeal] = useState("lasagna");

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
}

ActiveAuthors.whyDidYouRender = {
  logOnDifferentValues: true,
};

export default memo(ActiveAuthors);
