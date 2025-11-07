// Type definitions for bsky-embed web component

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'bsky-embed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        username?: string;
        feed?: string;
        search?: string;
        limit?: string;
        mode?: 'dark' | '';
        'link-target'?: '_self' | '_blank' | '_parent' | '_top';
        'link-image'?: 'true' | 'false';
        'load-more'?: 'true' | 'false';
        'disable-styles'?: 'true' | 'false';
        'disable-images'?: 'true' | 'false';
        'disable-videos'?: 'true' | 'false';
        'disable-autoplay'?: 'true' | 'false';
        'custom-styles'?: string;
        'custom-styles-file'?: string;
        'date-format'?: string;
      };
    }
  }
}

declare module 'bsky-embed/dist/bsky-embed.es.js' {
  const content: any;
  export default content;
}
