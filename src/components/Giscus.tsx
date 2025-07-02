import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  term?: string; // Used for mapping discussions to pages
}

export default function GiscusComments({ term }: GiscusCommentsProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Comments</h3>
        <Giscus
          id="comments"
          repo="DontFretBrett/portfolio"
          repoId="R_kgDONRd13Q"
          category="General"
          categoryId="DIC_kwDONRd13c4CsWUg"
          mapping="specific"
          term={term}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
} 