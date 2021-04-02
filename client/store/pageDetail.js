export const SET_PAGE_DETAIL = 'SET_PAGE_DETAIL';

export const setPageDetail = ({ sort, page, size }) => {
  return {
    type: SET_PAGE_DETAIL,
    sort,
    page,
    size,
  };
};

export const SET_PAGE_NEXT = 'SET_PAGE_NEXT';
export const nextPage = () => ({ type: SET_PAGE_NEXT });

export const SET_PAGE_PREV = 'SET_PAGE_PREV';
export const prevPage = () => ({ type: SET_PAGE_PREV });

export const SET_PAGE_SPECIFIC = 'SET_PAGE_SPECIFIC';
export const goToPage = (page) => ({ type: SET_PAGE_SPECIFIC, page });

export const SET_SORT = 'SET_SORT';
export const setSort = (sort) => ({ type: SET_SORT, sort });

const initialState = {};

export default (state = initialState, action) => {
  const { type, sort, page, size } = action;
  if (type === SET_PAGE_DETAIL) return { sort, page, size };
  if (type === SET_PAGE_NEXT) return { ...state, page: state.page + 1 };
  if (type === SET_PAGE_PREV) return { ...state, page: state.page - 1 };
  if (type === SET_PAGE_SPECIFIC) return { ...state, page };
  if (type === SET_SORT) return { ...state, sort, page: 1 };
  else return state;
};
