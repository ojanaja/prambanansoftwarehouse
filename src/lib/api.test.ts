jest.mock("next-sanity", () => {
  const mockClient = {
    fetch: jest.fn(),
  };
  return {
    createClient: jest.fn(() => mockClient),
  };
});

jest.mock("@sanity/image-url", () => {
  const mockBuilder = {
    image: jest.fn((source) => ({
      url: () => {
        if (typeof source === "string") return source;
        if (source?.asset?.url) return source.asset.url;
        if (source?.url) return source.url;
        return "https://example.com/image.png";
      }
    }))
  };
  return jest.fn(() => mockBuilder);
});

import { client } from "@/sanity/client";
const mockClientFetch = client.fetch as jest.Mock;

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
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    mockClientFetch.mockReset();
  });

  describe("getServices", () => {
    it("should fetch services from Sanity if available", async () => {
      const mockServices = [
        {
          _id: "s1",
          title_en: "Service One",
          title_id: "Layanan Satu",
          description_en: "Desc One",
          description_id: "Desc Satu",
          icon: "icon-one",
          order: 1
        }
      ];
      mockClientFetch.mockResolvedValueOnce(mockServices);

      const services = await getServices();
      expect(mockClientFetch).toHaveBeenCalledTimes(1);
      expect(services).toEqual(mockServices);
    });

    it("should return static fallback if Sanity fetch fails or is empty", async () => {
      mockClientFetch.mockRejectedValueOnce(new Error("Network Error"));

      const services = await getServices();
      expect(services).toHaveLength(3);
      expect(services[0].icon).toBe("custom");
    });
  });

  describe("getShowcaseProducts", () => {
    it("should fetch and map products from Sanity successfully", async () => {
      const mockProducts = [
        {
          _id: "p1",
          name_en: "Product One",
          name_id: "Produk Satu",
          description_en: "Desc One",
          description_id: "Desc Satu",
          image: "img1",
          order: 1
        }
      ];
      mockClientFetch.mockResolvedValueOnce(mockProducts);

      const products = await getShowcaseProducts();
      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        _id: "p1",
        name_en: "Product One",
        name_id: "Produk Satu",
        description_en: "Desc One",
        description_id: "Desc Satu",
        imageURL: "img1",
        imageURL2: "",
        imageURL3: "",
        order: 1
      });
    });

    it("should return static fallback if products fetch fails", async () => {
      mockClientFetch.mockRejectedValueOnce(new Error("Sanity Error"));

      const products = await getShowcaseProducts();
      expect(products).toHaveLength(3);
      expect(products[0]._id).toBe("product-binder");
    });
  });

  describe("getPortfolios", () => {
    it("should fetch and map portfolios list successfully", async () => {
      const mockPortfoliosData = [
        {
          _id: "p1",
          title: "Project One",
          slug: { current: "project-one" },
          description_en: "Description of project one",
          description_id: "Description of project one",
          category: "webapp",
          coverImage: "https://example.com/image.png",
          liveLink: "https://example.com",
          galleryImages: ["g1.png", "g2.png"],
        },
      ];

      mockClientFetch.mockResolvedValueOnce(mockPortfoliosData);

      const portfolios = await getPortfolios();
      expect(mockClientFetch).toHaveBeenCalledTimes(1);
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
      mockClientFetch.mockRejectedValueOnce(new Error("Sanity offline"));

      const portfolios = await getPortfolios();
      expect(portfolios).toEqual([]);
    });
  });

  describe("getPortfolioBySlug", () => {
    it("should return portfolio matching the slug", async () => {
      const mockPortfolio = {
        _id: "p2",
        title: "Project Two",
        slug: { current: "project-two" },
        description_en: "Desc",
        description_id: "Desc",
        category: "webapp",
        coverImage: "img2"
      };

      mockClientFetch.mockResolvedValueOnce(mockPortfolio);

      const match = await getPortfolioBySlug("project-two");
      expect(mockClientFetch).toHaveBeenCalledTimes(1);
      expect(match).not.toBeNull();
      expect(match?.title).toBe("Project Two");
    });

    it("should return null if slug is not found", async () => {
      mockClientFetch.mockResolvedValueOnce(null);

      const match = await getPortfolioBySlug("non-existent");
      expect(match).toBeNull();
    });
  });

  describe("getTestimonials", () => {
    it("should fetch and map testimonials successfully", async () => {
      const mockTestimonialsData = [
        {
          _id: "t1",
          name: "Alice",
          role_id: "Tech Corp",
          role_en: "Tech Corp",
          content_id: "Great service",
          content_en: "Great service",
          rating: 5,
          avatar: "https://example.com/avatar.png",
        },
      ];

      mockClientFetch.mockResolvedValueOnce(mockTestimonialsData);

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
      mockClientFetch.mockRejectedValueOnce(new Error("Testimonials error"));

      const testimonials = await getTestimonials();
      expect(testimonials).toEqual([]);
    });
  });

  describe("getArticles", () => {
    it("should fetch and map articles successfully", async () => {
      const mockArticlesData = [
        {
          _id: "a1",
          title: "Article One",
          slug: { current: "article-one" },
          description: "Excerpt of article",
          publishedAt: "2024-06-13",
          coverImage: "https://example.com/cover.png",
          authorName: "John Doe",
          authorImage: "http://author.img",
          categories: [
            { title: "Tech", description: "" },
            { title: "Education", description: "" },
          ],
        },
      ];

      mockClientFetch.mockResolvedValueOnce(mockArticlesData);

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
          image: "http://author.img",
        },
        categories: [
          { title: "Tech", description: "" },
          { title: "Education", description: "" },
        ],
      });
    });

    it("should return empty array if articles fetch fails", async () => {
      mockClientFetch.mockRejectedValueOnce(new Error("Articles error"));

      const articles = await getArticles();
      expect(articles).toEqual([]);
    });
  });

  describe("getArticleBySlug", () => {
    it("should fetch single article by slug successfully", async () => {
      const mockArticle = {
        _id: "a1",
        title: "Article One",
        slug: { current: "article-one" },
        description: "Excerpt of article",
        content: "Markdown body content",
        publishedAt: "2024-06-13",
        coverImage: "https://example.com/cover.png",
        authorName: "John Doe",
        authorImage: null,
        categories: [{ title: "Tech", description: "" }],
      };

      mockClientFetch.mockResolvedValueOnce(mockArticle);

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
      mockClientFetch.mockRejectedValueOnce(new Error("Not found"));

      const article = await getArticleBySlug("article-one");
      expect(article).toBeNull();
    });
  });
});
