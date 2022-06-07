import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import base16AteliersulphurpoolLight from 'react-syntax-highlighter/dist/cjs/styles/prism/base16-ateliersulphurpool.light'

interface Props {
  markdownContent: string;
}

const MarkdownPreview: FC<Props> = ({ markdownContent }) => {
  return (
    <>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={base16AteliersulphurpoolLight}
                language={match[1]}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </>
  )
}

export default MarkdownPreview
