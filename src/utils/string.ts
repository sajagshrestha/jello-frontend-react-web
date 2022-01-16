/**
 * Build supplied string by interpolating properties after delimiter ':' with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Barbara'})
 * => 'Barbaba is here.'
 *
 * @param {string} str
 * @param {object} params
 *
 * @returns String.
 */
export const interpolate = (str: string, params: any = {}) => {
  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val: any = value || "";

    formattedString = formattedString.replace(
      new RegExp(`:${key}`, "gi"),
      val.toString()
    );
  }

  return formattedString;
};
