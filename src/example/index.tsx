import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import cases from './cases';

const casesDict = {
  basic: <cases.Basic />,
};

const Menu = ({onClick}: { onClick: (string) => void }) => (
  <>
    {Object.keys(casesDict).map((slug) => {
      return (
        <li key={`cases-${slug}`}>
          <a
            href={slug}
            onClick={(e) => {
              e.preventDefault();
              onClick(slug);
            }}
          >
            {slug}
          </a>
        </li>
      );
    })}
  </>
);

const App = () => {
  const [actExample, setActExample] = useState();

  return (
    <>
      <ul><Menu onClick={setActExample}/></ul>
      <div>
        {actExample && (
          casesDict[actExample]
        )}
      </div>
    </>
  );
};

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
