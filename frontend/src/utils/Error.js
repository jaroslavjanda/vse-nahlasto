export const ErrorType = {
  LOAD_DATA_FAILED: 'LOAD_DATA_FAILED',
  SENDING_FAILED: 'SENDING_FAILED',
  UNKNOWN: 'UNKNOWN',
};

const ErrorMessage = {
  LOAD_DATA_FAILED: 'Data se nepovedlo načíst',
  UNKNOWN: 'Neznámá chyba',
};

export const errorMessage = (error) => {
  switch (error) {
    case ErrorType.LOAD_DATA_FAILED:
      return ErrorMessage.LOAD_DATA_FAILED;
    case ErrorType.UNKNOWN:
      return ErrorMessage.UNKNOWN;
    default:
      return '';
  }
};
