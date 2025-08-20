interface ButtonProp {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProp) {
  return (
    <button className="btn-primary">
      {children}
    </button>
  )
}