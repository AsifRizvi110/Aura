export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  sections: BlogSection[];
}

export const BLOG_CATEGORIES = ['All', 'Fabrics', 'Customization', 'Manufacturing', 'Sourcing'];

// NOTE: These are sample posts. Replace titles, dates and text with your own articles.
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'choosing-cap-fabric',
    title: 'Cotton Twill, Polyester or Nylon: Choosing the Right Cap Fabric',
    excerpt:
      'The fabric decides how a cap looks, feels and lasts. Here is a simple way to match the material to the season and the customer.',
    category: 'Fabrics',
    date: '2026-10-02',
    readTime: '4 min read',
    sections: [
      {
        heading: 'Start with how the cap will be used',
        paragraphs: [
          'A promotional cap handed out at events needs a different fabric from a cap worn on a job site every day. Before comparing materials, decide where the cap will be worn, in which weather, and how often it will be washed.'
        ]
      },
      {
        heading: 'Cotton twill for a classic look',
        paragraphs: [
          'Cotton twill is soft, breathable and holds embroidery well, which is why it is the usual choice for everyday and fashion caps. It can shrink or fade if it is washed hard, so it suits brands that value comfort and a natural feel.'
        ]
      },
      {
        heading: 'Polyester and nylon for performance',
        paragraphs: [
          'Polyester and nylon dry quickly, resist wrinkles and keep colour well, so they are common in sports and outdoor headwear. They are lighter than cotton, but they are less breathable unless the cap has mesh panels or eyelets.'
        ]
      }
    ]
  },
  {
    id: 'embroidery-vs-printing',
    title: 'Embroidery or Print? How to Decorate Your Cap Logo',
    excerpt:
      'Flat embroidery, 3D puff, patches and heat transfers each give a different result. Learn which suits your artwork.',
    category: 'Customization',
    date: '2026-09-24',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Flat embroidery',
        paragraphs: [
          'Flat embroidery is stitched directly into the fabric and is durable and clean. It works best for logos with solid shapes and a limited number of colours. Very fine lines and tiny text can fill in, so keep details above a readable size.'
        ]
      },
      {
        heading: '3D puff embroidery',
        paragraphs: [
          'Puff embroidery uses foam under the stitches to raise the design off the cap. It makes bold letters and simple shapes stand out, but it is not a good fit for small or intricate artwork.'
        ]
      },
      {
        heading: 'Patches and transfers',
        paragraphs: [
          'Woven or rubber patches handle detailed logos that are hard to stitch directly, and heat transfers can reproduce gradients and many colours. Ask for a sample so you can check how the artwork looks on the actual cap.'
        ]
      }
    ]
  },
  {
    id: 'from-sample-to-bulk',
    title: 'From Sample to Bulk Order: What to Expect When Working With a Cap Factory',
    excerpt:
      'A clear brief and an approved sample save weeks. This is the usual path from first enquiry to shipment.',
    category: 'Sourcing',
    date: '2026-09-15',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Prepare your brief',
        paragraphs: [
          'Send the cap style, fabric, colours, logo files, sizes and the quantity you have in mind. The more complete the brief, the more accurate the quote and the sample will be.'
        ]
      },
      {
        heading: 'Review and approve the sample',
        paragraphs: [
          'Check the fit, the stitching, the logo placement and the colour against your reference. Request changes before approval, because the approved sample becomes the standard for the bulk order.'
        ]
      },
      {
        heading: 'Production, inspection and shipping',
        paragraphs: [
          'During production the factory cuts, sews, embroiders and inspects the caps against the approved sample. Confirm packing, labelling and shipping terms early so that nothing delays dispatch at the end.'
        ]
      }
    ]
  },
  {
    id: 'what-makes-a-well-made-cap',
    title: 'What Makes a Well-Made Cap? Five Things to Check Before You Order',
    excerpt:
      'Stitching, panel alignment, crown shape, sweatband and closure: a quick checklist for judging cap quality.',
    category: 'Manufacturing',
    date: '2026-09-05',
    readTime: '4 min read',
    sections: [
      {
        heading: 'Stitching and panels',
        paragraphs: [
          'Look for even, tight stitching with no loose threads, and panels that meet cleanly at the seams. Uneven seams are the first sign of rushed production.'
        ]
      },
      {
        heading: 'Shape and structure',
        paragraphs: [
          'The crown should hold its shape and the visor should be straight and symmetrical. Buckram or other front lining keeps the front panels upright after repeated wear.'
        ]
      },
      {
        heading: 'Comfort and closure',
        paragraphs: [
          'A good sweatband sits flat and does not irritate the forehead. Test the strap, snap or buckle several times to make sure it adjusts smoothly and does not loosen.'
        ]
      }
    ]
  }
];