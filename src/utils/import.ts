export const resolveImportStatus = (status: number) => {
  switch (status) {
    case 1:
      return 'Waiting to be processed'
    case 2:
      return 'Pending confirmation'
    case 3:
      return 'Cancelled'
    case 4:
      return 'Completed'
    default:
      return 'Unknown'
  }

  return 'Unknown'
}
