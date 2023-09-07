import {useEffect, useState} from "react";
import debounce from 'lodash.debounce';
import {FormContainer, InputField, SuggestionItem, Suggestions} from "./search-page-styled";
import {Continent, Country, Language} from "./types";
import {useNavigate} from "react-router-dom";



type SearchResponse = {
    continents: Continent[]
    countries: Country[]
    languages: Language[]
}
export const SearchPage = () => {
    const navigate = useNavigate()

    const [inputText, setInputText] = useState('');

    const [countries, setCountries] = useState<Country[] | null>([]);
    const [languages, setLanguages] = useState<Language[] |null>([]);
    const [continents, setContinents] = useState<Continent[]| null>([]);

    const fetchSuggestions = async (text: string) => {
        try {
            const token = await localStorage.getItem('access_token'); // Вызов функции аутентификации
            const response: SearchResponse = await fetch('https://icebrg.mehanik.me/api/search', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: text,
                }),
            }).then(res=>res.json());
            console.log('response', response)
            setContinents(response.continents)
            setCountries(response.countries)
            setLanguages(response.languages)
        } catch (error) {
            console.error('Ошибка получения подсказок', error);
        }
    };
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

    useEffect(() => {
        if (inputText.trim() !== '') {
            debouncedFetchSuggestions(inputText);
        } else {
            setCountries([]);
            setLanguages([]);
            setContinents([]);
        }
    }, [debouncedFetchSuggestions, inputText]);

    const handleInputChange = (e: any) => {
        setInputText(e.target.value);
    };

    const onSuggestionClick = (inputText: string)=>{
        setInputText(inputText);
    }

    const onLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login')
    }

    return (
    <FormContainer>
        <h2>Autocomplete Input</h2>
        <button onClick={onLogOut}>LogOut</button>
        <InputField
            type="text"
            placeholder="Type here..."
            value={inputText}
            onChange={handleInputChange}
        />
        { inputText && (
            <Suggestions>
                {continents?.map((continent) => (
                    <SuggestionItem key={continent.code} onClick={()=>onSuggestionClick(continent.name)}>{continent.name}</SuggestionItem>
                ))}
                {countries?.map((country) => (
                    <SuggestionItem key={country.code} onClick={()=>onSuggestionClick(country.name)}>{country.name}</SuggestionItem>
                ))}
                {languages?.map((language) => (
                    <SuggestionItem key={language.code} onClick={()=>onSuggestionClick(language.name)}>{language.name}</SuggestionItem>
                ))}

            </Suggestions>
        )}
    </FormContainer>
    );
}