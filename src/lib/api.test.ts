import {
  getServices,
  getShowcaseProducts,
  getPortfolios,
  getPortfolioBySlug,
  getTestimonials,
  getArticles,
  getArticleBySlug,
} from "./api";

describe("api library mappings", () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch as any;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getServices", () => {
    it("should return static services list", () => {
      const services = getServices();
      expect(services).toHaveLength(3);
      expect(services[0]).toHaveProperty("title_en");
      expect(services[0]).toHaveProperty("title_id");
    });
  });

  describe("getShowcaseProducts", () => {
    it("should return static products list", () => {
      const products = getShowcaseProducts();
      expect(products).toHaveLength(3);
      expect(products[0]).toHaveProperty("name_en");
      expect(products[0]).toHaveProperty("imageURL");
    });
  });

  describe("getPortfolios", () => {
    it("should fetch and map portfolios list successfully", async () => {
      const mockPortfoliosData = [
        {
          id: "p1",
          title: "Project One",
          slug: "project-one",
          description: "Description of project one",
          image: "https://example.com/image.png",
          liveLink: "https://example.com",
          galleryImages: ["g1.png", "g2.png"],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPortfoliosData,
      });

      const portfolios = await getPortfolios();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(portfolios).toHaveLength(1);
      expect(portfolios[0]).toEqual({
        _id: "p1",
        title: "Project One",
        slug: "project-one",
        description_en: "Description of project one",
        description_id: "Description of project one",
        category: "webapp",
        imageUrl: "https://example.com/image.png",
        liveLink: "https://example.com",
        galleryImages: ["g1.png", "g2.png"],
      });
    });

    it("should return empty array if fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const portfolios = await getPortfolios();
      expect(portfolios).toEqual([]);
    });
  });

  describe("getPortfolioBySlug", () => {
    it("should return portfolio matching the slug", async () => {
      const mockPortfoliosData = [
        { id: "p1", title: "Project One", slug: "project-one", description: "Desc", image: "img1" },
        { id: "p2", title: "Project Two", slug: "project-two", description: "Desc", image: "img2" },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPortfoliosData,
      });

      const match = await getPortfolioBySlug("project-two");
      expect(match).not.toBeNull();
      expect(match?.title).toBe("Project Two");
    });

    it("should return null if slug is not found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const match = await getPortfolioBySlug("non-existent");
      expect(match).toBeNull();
    });
  });

  describe("getTestimonials", () => {
    it("should fetch and map testimonials successfully", async () => {
      const mockTestimonialsData = [
        {
          id: "t1",
          name: "Alice",
          company: "Tech Corp",
          content: "Great service",
          rating: 5,
          avatarImage: "https://example.com/avatar.png",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTestimonialsData,
      });

      const testimonials = await getTestimonials();
      expect(testimonials).toHaveLength(1);
      expect(testimonials[0]).toEqual({
        _id: "t1",
        name: "Alice",
        role_id: "Tech Corp",
        role_en: "Tech Corp",
        content_id: "Great service",
        content_en: "Great service",
        rating: 5,
        imageUrl: "https://example.com/avatar.png",
      });
    });

    it("should return empty array if testimonials fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const testimonials = await getTestimonials();
      expect(testimonials).toEqual([]);
    });
  });

  describe("getArticles", () => {
    it("should fetch and map articles successfully", async () => {
      const mockArticlesData = [
        {
          id: "a1",
          title: "Article One",
          slug: "article-one",
          excerpt: "Excerpt of article",
          publishedAt: "2024-06-13",
          coverImage: "https://example.com/cover.png",
          author: "John Doe",
          tags: ["Tech", "Education"],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockArticlesData,
      });

      const articles = await getArticles();
      expect(articles).toHaveLength(1);
      expect(articles[0]).toEqual({
        _id: "a1",
        title: "Article One",
        slug: "article-one",
        description: "Excerpt of article",
        publishedAt: "2024-06-13",
        imageUrl: "https://example.com/cover.png",
        author: {
          name: "John Doe",
          image: null,
        },
        categories: [
          { title: "Tech", description: "" },
          { title: "Education", description: "" },
        ],
      });
    });

    it("should return empty array if articles fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const articles = await getArticles();
      expect(articles).toEqual([]);
    });
  });

  describe("getArticleBySlug", () => {
    it("should fetch single article by slug successfully", async () => {
      const mockArticle = {
        id: "a1",
        title: "Article One",
        slug: "article-one",
        excerpt: "Excerpt of article",
        content: "Markdown body content",
        publishedAt: "2024-06-13",
        coverImage: "https://example.com/cover.png",
        author: "John Doe",
        tags: ["Tech"],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockArticle,
      });

      const article = await getArticleBySlug("article-one");
      expect(article).not.toBeNull();
      expect(article).toEqual({
        _id: "a1",
        title: "Article One",
        slug: "article-one",
        description: "Excerpt of article",
        content: "Markdown body content",
        publishedAt: "2024-06-13",
        imageUrl: "https://example.com/cover.png",
        author: {
          name: "John Doe",
          image: null,
        },
        categories: [{ title: "Tech", description: "" }],
      });
    });

    it("should return null if single article fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const article = await getArticleBySlug("article-one");
      expect(article).toBeNull();
    });
  });
});
