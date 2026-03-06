export default function Head() {
  return (
    <>
      <link
        rel="icon"
        href="/favicon-dark.ico?v=2"
        sizes="any"
        type="image/x-icon"
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        href="/favicon.ico?v=2"
        sizes="any"
        type="image/x-icon"
        media="(prefers-color-scheme: light)"
      />
      <link rel="icon" href="/favicon.ico?v=2" sizes="any" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
    </>
  );
}
