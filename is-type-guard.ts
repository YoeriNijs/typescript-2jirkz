export const isTypeGuard = <T>(
  value: any,
  typeGuard: (props: string[]) => boolean
): value is T => {
  return value && value.props && typeGuard(value.props);
};
