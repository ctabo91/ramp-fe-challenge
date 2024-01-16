import { Employee } from "./types"

export const EMPTY_EMPLOYEE: Employee = {
  id: "empty" /* changed id to 'empty' so it doesn't trigger an error when clicking All Employees in filter dropdown */,
  firstName: "All",
  lastName: "Employees",
}
