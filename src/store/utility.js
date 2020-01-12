export const updateObject = (state, updatedValue) => {
    return {
        ...state,
        ...updatedValue
      };
}