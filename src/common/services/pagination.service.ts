const DEFAULT_PAGE = 1;

export class PaginationService {
  static getPagination(
    page = DEFAULT_PAGE,
    size = 3,
  ): { limit: number; offset: number } {
    const limit = Number(size);
    const offset = (Number(page) - 1) * limit;

    return { limit, offset };
  }

  static getPaginationMetadata({
    totalData,
    page = DEFAULT_PAGE,
    limit,
  }: {
    totalData: number;
    page: number;
    limit: number;
  }) {
    const currentPage = Number(page);
    const totalPages = Math.ceil(Number(totalData) / Number(limit)) || 1;

    return { currentPage, totalPages };
  }
}
