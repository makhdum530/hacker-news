import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Story } from '../components/Story';
import { topStoriesUrl } from '../utilities/apiHelper.js';
import styles from '../styles/headerstyles.module.scss';
import Pagination from '../components/Pagination';
import Nav from '../components/Nav';
import { motion, AnimatePresence } from 'framer-motion';

export default function Top({ result }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage, setStoriesPerPage] = useState(20);
  const [direction, setDirection] = useState('forward');

  // Get current posts
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;

  return (
    <>
      <Head>
        <title>Hacker News Next | Top</title>
      </Head>
      <header className={styles.header}>
        <Nav setCurrentPage={setCurrentPage} />
        <Pagination
          storiesPerPage={storiesPerPage}
          totalStories={result.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setDirection={setDirection}
        />
      </header>
      <AnimatePresence>
        {result.slice(indexOfFirstStory, indexOfLastStory).map((id) => (
          <motion.section
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            key={id}
            className={styles.section}
          >
            <Story key={id} storyId={id} direction={direction} />
          </motion.section>
        ))}
      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps() {
  const result = await axios.get(topStoriesUrl).then(({ data }) => data);

  return {
    props: {
      result,
    },
  };
}
