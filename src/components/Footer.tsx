export default function Footer() {
  return (
    <footer className="relative mt-12 pt-8 pb-8 px-4 border-t border-border bg-background/70 backdrop-blur-md shadow-lg flex flex-col items-center justify-center z-30">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Elwison Denampo. All rights reserved.
          </p>
          <a
            href="resume/Elwison Denampo Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 inline-block"
          >
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
