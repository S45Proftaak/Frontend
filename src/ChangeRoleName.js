export default function handleRoleName(role) {
    switch (role) {
      case "ROLE_EMPLOYEE":
        return "Admin.Employee";
      case "ROLE_SECRETARY":
        return "Admin.Secretary";
      case "ROLE_ADMIN":
        return "Admin.Admin";
      default:
        return "Admin.Employee";
    }
  }