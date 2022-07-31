import { createAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export const updateLastActiveDate = createAction(
  "notes/updateLastActiveDate",
  (dateString) => {
    return {
      payload: {
        dateString,
      },
    };
  }
);

const userReducer = (userData = [], action) => {
  if (action.type === updateLastActiveDate.toString()) {
    console.log("updateLastActiveDate called", action.payload.dateString);
    return produce(userData, (draft) => {
      draft[0].lastActiveDate = action.payload.dateString;
      draft[0].myObj = newObj;
      draft[0].myObj.fieldA = newObj.fieldA;
      draft[0].myObj.fieldB = newObj.fieldB;
      // ...
      Object.assign(draft[0].myObj, newObj);

      // field = value; → field === value
    });
  }

  return userData;
};

export default userReducer;
