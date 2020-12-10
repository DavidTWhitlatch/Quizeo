import Header from 'components/Header';

export default function Layout(props) {
  const { currentUser, children } = props;
  return (
    <>
      <Header currentUser={currentUser} />
      {children}
    </>
  )
}
