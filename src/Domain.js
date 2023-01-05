import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import  BarChart  from "./components/BarChart";
import LineChart from "./components/LineChart";


function Domain() {
  // const Posts = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      const getPosts = async () => {
        const resp = await fetch('https://project-1.yangyuxin0714.workers.dev/popular-domains');
        const postsResp = await resp.json();
        // console.log(postsResp)

        setPosts(postsResp);
      };
    
      getPosts();
    }, []);
    console.log(posts)

    const [domainColor, setDomainColor] = useState([])
    useEffect(() => {
      const colors = []
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].rankingEntry[0].category === "Technology") {
          colors.push("#89CFF0")
        } else if (posts[i].rankingEntry[0].category === "Entertainment") {
          colors.push("#F0E68C")
        } else if (posts[i].rankingEntry[0].category === "Society & Lifestyle") {
          colors.push("#F08080")
        } else if (posts[i].rankingEntry[0].category === "Business & Economy") {
          colors.push("#90EE90")
        } else if (posts[i].rankingEntry[0].category === "Shopping & Auctions") {
          colors.push("#FFA07A")
        } else if (posts[i].rankingEntry[0].category === "Internet Communication") {
          colors.push("#FFD700")
        }
      }
      setDomainColor(colors)
    }, [posts])

    const [domainData, setDomainData] = useState({
      labels: posts.map(post => post.rankingEntry[0].domain),
      datasets: [
        {
          label: "Ranking",
          data: posts.map(post => post.rankingEntry[0].rank)
        }
      ]

    })

    useEffect(() => {
      // const getPosts = async () => {
        const obj = {
          labels: posts.map(post => post.rankingEntry[0].domain),
          datasets: [
            {
              label: "Ranking",
              data: posts.map(post => post.rankingEntry[0].rank),
              backgroundColor: domainColor
            }
          ],
          
        }
        // console.log(postsResp)
        setDomainData(obj);
      // };
    
    }, [posts, domainColor]);

    const [domainChangeData, setDomainChangeData] = useState({
      labels: posts.map(post => post.rankingEntry[0].domain),
      datasets: [
        {
          label: "Rank Change",
          data: posts.map(post => post.rankingEntry[0].rankChnage)
        }
      ]

    })

    useEffect(() => {
      // const getPosts = async () => {
        const obj = {
          labels: posts.map(post => post.rankingEntry[0].domain),
          datasets: [
            {
              label: "Rank Change",
              data: posts.map(post => post.rankingEntry[0].rankChange)
            }
          ],
          
        }
        // console.log(postsResp)
        setDomainChangeData(obj);
      // };
    
    }, [posts]);

  return (
    // <div>{posts.map(post => <div>{post.rankingEntry}</div>)}</div>
    // <div>{posts.map(post => <div key={post.rankingEntry}>{post.rankingEntry[0].rank}</div>)}</div>
    <div className="App">
      <div style={{ width: 700}}>
       <h1>Popular Domains</h1>
        <BarChart chartData={domainData}/>
        <ul className="legend">
            <li><span className="technology"></span> Technology</li>
            <li><span className="entertainment"></span> Entertainment</li>
            <li><span className="society"></span> Society & Lifestyle</li>
            <li><span className="business"></span> Business & Economy</li>
            <li><span className="shopping"></span> Shopping & Auctions</li>
            <li><span className="internet"></span> Internet Communication</li>
        </ul>
        <h1 style={{marginTop:100}}>Domain Rank Change Compared To Previous 30 Days</h1>
        <BarChart chartData={domainChangeData}/>
        
  </div>
    </div>
  );
}

export default Domain;
