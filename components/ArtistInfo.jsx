import { useState, useEffect } from 'react';
//nrug af useEffect til at hente data fra API'en (bruges i React til at håndtere sideeffekter som API-kald)
import ListViewIconOutline from '../src/assets/List_view_outline.svg';
import CardViewIconOutline from '../src/assets/Card_view_outline.svg';
import ListViewIconSolid from '../src/assets/List_view_solid.svg';
import CardViewIconSolid from '../src/assets/Card_view_solid.svg';

function ArtistInfo() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('viewMode') || 'feed';
  });

//brug af en masse useState hooks til at håndtere albumdata, loading, errors, valgte album og visningstilstand (tabel eller feed-view)
//brug af localStorage til at gemme visningstilstanden, således at den huskes når brugeren genindlæser siden

  useEffect(() => {
    async function fetchArtistAlbumData() {
      try {
        //GET-request til API'et for at hente albumdata
        const albumResponse = await fetch('https://www.theaudiodb.com/api/v1/json/2/album.php?i=111248'); //Elvis presley's artist ID fra theaudiodb.com API
        if (!albumResponse.ok) {
          throw new Error(`HTTP-fejl! Status: ${albumResponse.status}`);
        }
        const albumData = await albumResponse.json();

        if (albumData.album) {
          setAlbums(albumData.album);
        } else {
          console.log('Ingen albumdata fundet');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtistAlbumData();
  }, []);

//useEffect bliver kaldt hver gang komponenten er rendered (eller ved ændringer i komponenten), bliver brugt til at hente albumdata fra API'et, 
//opdaterer 'albums' med dataen, håndterer fejl og sætter 'loading' til false, når data er hentet eller fejl opstår.

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);
//[viewMode] er et dependency og useEffect re-renders, når viewMode ændres

//loading og error beskeder vises, hvis data ikke er hentet eller fejl opstår
  if (loading) return <p>Indlæser data...</p>;
  if (error) return <p>Fejl: {error}</p>;

  const toggleViewMode = (mode) => setViewMode(mode);
  const handleAlbumClick = (album) => setSelectedAlbum(album);
  const handleBackClick = () => setSelectedAlbum(null);

  return (
    <div>
      {!selectedAlbum && (
        <>
        {/*Dette er et "fragment", der bruges til at gruppere elementer i en React komponent - f.eks. stedet for en random div*/}
          <h2 className="artistCountTitle">
            {albums[0].strArtist}'s Diskografi <span className="albumCount">({albums.length})</span>
          </h2>
          <div className="iconContainer">
            <img
              src={viewMode === 'feed' ? ListViewIconSolid : ListViewIconOutline}
              className="viewIcon"
              onClick={() => toggleViewMode('feed')}
              alt="Card View"
            />
            <img
              src={viewMode === 'cards' ? CardViewIconSolid : CardViewIconOutline}
              className="viewIcon"
              onClick={() => toggleViewMode('cards')}
              alt="Feed View"
            />
          </div>
        </>
      )}

      {selectedAlbum ? (
        <div className="albumContainer">
          {selectedAlbum.strAlbumThumb && (
            //conditional rendering - hvis der er et album cover, vises det, ellers vises intet billede
            <img
              className="selectedAlbumImage"
              src={selectedAlbum.strAlbumThumb}
            />
          )}
          <h3>{selectedAlbum.strAlbum}</h3>
          <p><span className="boldParagraf">Udgivelsesår: </span>{selectedAlbum.intYearReleased || 'Ingen beskrivelse om udgivelsesår tilgængelig'}</p>
          <p><span className="boldParagraf">Genre: </span>{selectedAlbum.strGenre || "Ingen beskrivelse om genre tilgængelig"}</p>
          <p><span className="boldParagraf">Label: </span>{selectedAlbum.strLabel || "Ingen beskrivelse om label tilgængelig"}</p>
          <p><span className="boldParagraf">Beskrivelse: </span>{selectedAlbum.strDescriptionEN || "Ingen albumbeskrivelse tilgængelig"}</p>
          <button className="backButton" onClick={handleBackClick}>Tilbage</button>
        </div>
      ) : viewMode === 'cards' && albums.length > 0 ? (
        <div className="cardsContainer">
          {/*looper gennem alle returnerede albums og genererer en albumContainer med img (hvis der er et billede) */}
          {albums.map((album, index) => (
            <div
              className="albumContainer"
              key={index}
              onClick={() => handleAlbumClick(album)}
            >
              {album.strAlbumThumb && (
                <img
                  className="cardImage"
                  src={album.strAlbumThumb}
                />
              )}
              <h3>{album.strAlbum || 'Ingen information om albumnavn tilgængelig'}</h3>
              <p>{album.intYearReleased || 'Ingen information om udgivelsesår tilgængelig'}</p>
            </div>
          ))}
        </div>
      ) : viewMode === 'feed' && albums.length > 0 ? (
        <div className="albumFeed">
          {/*looper gennem alle returnerede albums og genererer et albumCard med img (hvis der er et billede) */}
          {albums.map((album, index) => (
            <div
              key={index}
              className="albumCard"
              onClick={() => handleAlbumClick(album)}
            >
              {album.strAlbumThumb && (
                <img
                  src={album.strAlbumThumb}
                  className="albumImage"
                />
              )}
              <div className="albumDescription">
                <h3>{album.strAlbum || 'Ingen information om albumnavn tilgængelig'}</h3>
                <p>{album.strGenre || 'Ingen information om genre tilgængelig'} - {album.intYearReleased || 'ingen information om udgivelsesår tilgængelig'}</p>
                <p>{album.strDescriptionEN || 'Ingen albumbeskrivelse tilgængelig'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        //conditional rendering igen - hvis der ikke er nogen albums, vises denne besked
        <p>Ingen {albums[0]?.strArtist || 'Ingen information om artist fundet'} albums fundet</p>
      )}
    </div>
  );
}

export default ArtistInfo;
