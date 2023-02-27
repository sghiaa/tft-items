import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemButton from '../ItemButton/ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import ItemIcon from '../ItemIcon/ItemIcon';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import Footer from '../Footer/Footer';

type Tag = "gadgeteen" |
  "heart" |
  "brawler" |
  "starguardian" |
  "defender" |
  "aegis" |
  "mascot" |
  "animasquad" |
  "threat" |
  "spellslinger" |
  "duelist" |
  "recon" |
  "renegade" |
  "oxforce" |
  "mechaprime" |
  "underground" |
  "supers" |
  "prankster" |
  "admin" |
  "hacker" |
  "lasercorps" |
  "corrupted" |
  "sureshot" |
  "arsenal" |
  "civilian" |
  "ace" |
  "forecaster" 

type Frequencies = Map<Tag, number>

type Champion = {
  name: string;
  tier: number;
  tags: Array<Tag>;
}

const findChampionsWithMostSharedTags = (allChampions: Champion[], teamChampions: Champion[]): Champion[] => {
  const tagFrequencies: Frequencies = new Map();
  
  // Calculate the frequency of each tag among the existing team members
  for (const teamMember of teamChampions) {
    const uniqueTags = new Set(teamMember.tags);
    for (const tag of uniqueTags) {
      if (tagFrequencies.has(tag)) {
        tagFrequencies.set(tag, tagFrequencies.get(tag)! + 1);
      } else {
        tagFrequencies.set(tag, 1);
      }
    }
  }

  // Calculate the number of team members that share each tag
  const teamTagFrequencies: Frequencies = new Map();
  for (const teamMember of teamChampions) {
    for (const tag of teamMember.tags) {
      if (teamTagFrequencies.has(tag)) {
        teamTagFrequencies.set(tag, teamTagFrequencies.get(tag)! + 1);
      } else {
        teamTagFrequencies.set(tag, 1);
      }
    }
  }
  
  // Sort all champions by the number of shared tags with the existing team members
  const sortedChampions = allChampions.slice().sort((a, b) => {
    let aSharedTags = 0;
    let bSharedTags = 0;
    for (const tag of a.tags) {
      if (tagFrequencies.has(tag)) {
        aSharedTags += tagFrequencies.get(tag)! * (teamTagFrequencies.get(tag) || 1);
      }
    }
    for (const tag of b.tags) {
      if (tagFrequencies.has(tag)) {
        bSharedTags += tagFrequencies.get(tag)! * (teamTagFrequencies.get(tag) || 1);
      }
    }
    return bSharedTags - aSharedTags;
  });
  
  // Filter out any champions that are already in the teamChampions array or have zero shared tags with the team
  const filteredChampions = sortedChampions.filter(champion => !teamChampions.includes(champion) && champion.tags.some(tag => tagFrequencies.has(tag)));
  
  // Return the top 5 champions with the most shared tags
  return filteredChampions.slice(0, 5);
}

const TeamComps = () => {
  const [ data, setData ] = useState<Array<Champion>>();
  const load = function(){
    fetch( './tft_unit_data.csv' )
        .then( response => response.text() )
        .then( body => Papa.parse(body, {header: true}))
        .then( data => data.data.map((row) => { 
          const tags = Object.keys(row).map((tag) => {
            if(row[tag] === "x") {
              return tag;
            }
          }).filter((val) => val !== undefined )
          return { name: row.name, tier: row.tier, tags: tags }
        }))
        .then( csv => setData(csv) )
  };

  useEffect(() => {
    load();
  }, []);
  
  const [champions, setChampions] = useState<Array<Champion>>([]);
  const [frequencies, setFrequencies] = useState<Frequencies>();
  const [targets, setTargets] = useState<Array<Champion>>();
  const addChampion = (champ: Champion) => {
    setChampions([champ, ...champions]);
  }
  const removeChampion = (index: number) => {
    let temp = [...champions];
    temp.splice(index, 1)
    setChampions(temp);
  }
  useEffect(() => {
    const tagFrequencies: Frequencies = new Map();
    const uniqueTeamChampions = Array.from(new Set(champions.map(champion => champion.name))).map(name => champions.find(champion => champion.name === name)!);
  
    // Calculate the frequency of each tag among the existing team members
    for (const teamMember of uniqueTeamChampions) {
      for (const tag of teamMember.tags) {
        if (tagFrequencies.has(tag)) {
          tagFrequencies.set(tag, tagFrequencies.get(tag)! + 1);
        } else {
          tagFrequencies.set(tag, 1);
        }
      }
    }
    setFrequencies(tagFrequencies);
  }, [champions])

  useEffect(() => {
    if(data) {
      let t = findChampionsWithMostSharedTags(data, champions);
      setTargets(t)
    }
  }, [data, champions])
  return (
    <div className="App">
      <Container className="gameArea">
        <Row className="teamSelection">
          <h2 className="teamSelection-title">Who is on your team?</h2>
          <Row className="championSelection">
            {data && data.map((i, index) => {
              return (
                <Col xs={3} key={index}>
                  <button className="championSelection-button" onClick={() => addChampion(i)}>{i.name}</button>
                </Col>
              )
            })}
          </Row>
          <Row className="team">
            <div className="team-title">
              <h3>Team:</h3>
            </div>
            {champions.map((i, index) => {
              return (
                <Col xs={3} key={index}>
                  <button className="team-button" onClick={() => removeChampion(index)}>{i.name}</button>
                </Col>
              )
            })}
          </Row>
        </Row>
        <Row className="suggestedChampions">
          <div className="suggestedChampions-content">
            <h2>Suggested Champions</h2>
            {targets && frequencies && targets.map(champion => {
              const matchingTags = champion.tags.filter(tag => frequencies.has(tag));
              const matchingTagsString = matchingTags.join(", ");
              return <p key={champion.name}>{champion.name}: {matchingTagsString}</p>;
            })}
          </div>
        </Row>
        <Row className="currentTeamTags">
          <div className="currentTeamTags-title">
            <h2>Current team tags:</h2>
          </div>
          {frequencies && 
              <Row className="currentTeamTags-tags">
                <Col xs={2} className="currentTeamTags-tag">Gadgeteen: {frequencies.get("gadgeteen") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Heart: {frequencies.get("heart") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Brawler: {frequencies.get("brawler") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">StarGuardian: {frequencies.get("starguardian") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Defender: {frequencies.get("defender") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Aegis: {frequencies.get("aegis") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Mascot: {frequencies.get("mascot") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">AnimaSquad: {frequencies.get("animasquad") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Threat: {frequencies.get("threat") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Spellslinger: {frequencies.get("spellslinger") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Duelist: {frequencies.get("duelist") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Recon: {frequencies.get("recon") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Renegade: {frequencies.get("renegade") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">OxForce: {frequencies.get("oxforce") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">MechaPrime: {frequencies.get("mechaprime") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Underground: {frequencies.get("underground") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Supers: {frequencies.get("supers") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Prankster: {frequencies.get("prankster") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Admin: {frequencies.get("admin") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Hacker: {frequencies.get("hacker") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Lasercorps: {frequencies.get("lasercorps") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Corrupted: {frequencies.get("corrupted") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Sureshot: {frequencies.get("sureshot") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Arsenal: {frequencies.get("arsenal") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Civilian: {frequencies.get("civilian") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Ace: {frequencies.get("ace") || 0}</Col>
                <Col xs={2} className="currentTeamTags-tag">Forecaster: {frequencies.get("forecaster") || 0}</Col>
              </Row>
          }
        </Row>
      </Container>
      <div>
        <Footer page="team-comps" />
      </div>
    </div>
  );
}

export default TeamComps;
