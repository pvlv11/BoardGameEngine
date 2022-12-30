export interface Game {
    game_id_id: number,
    id: number,
    rank_value: number,
    avg_rank: number,
    name: string,
    image_url: string,
    release_year: number,
    avg_time: number, 
    min_player: number, 
    max_player: number, 
    minimal_age: number, 
    publisher: string,
    is_favourite: boolean,
    state: boolean,
    game_description: string,
    genres: Array<string>
}