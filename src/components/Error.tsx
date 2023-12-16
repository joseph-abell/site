const Error = ( props: { error: { message: string } } ) => {
  const error = props.error;
  const message = error.message;

  return (
    <div>
      <h1>Oops, an error occurred</h1>
      <p>{message}</p>
    </div>
  )
}

export default Error;
