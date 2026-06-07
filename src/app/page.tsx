import HomePage from "./HomePage";

export default function Page() {
  return (
    <>
      {/* Netlify detects forms from static HTML in the built page */}
      <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="bot-field" />
        <input type="email" name="email" />
        <input type="hidden" name="form-name" value="newsletter" />
      </form>
      <HomePage />
    </>
  );
}
