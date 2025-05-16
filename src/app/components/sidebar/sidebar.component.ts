import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../memory.service';
import { MediaType } from '../../models/mediaType';
import { ViewMode } from '../../models/viewMode';
import { Channel } from '../../models/channel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  playlists: string[] = ['All playlists', 'Playlist 1'];
  expandedPlaylist: string | null = 'Playlist 1';
  
  favorites: Channel[] = [];
  groups: Channel[] = [];
  selectedGroup: Channel | null = null;
  
  viewModeEnum = ViewMode;
  mediaTypeEnum = MediaType;
  
  constructor(public memory: MemoryService) {}
  
  ngOnInit(): void {
    this.loadGroups();
    this.loadFavorites();
  }
  
  togglePlaylist(playlist: string): void {
    this.expandedPlaylist = this.expandedPlaylist === playlist ? null : playlist;
  }
  
  selectGroup(group: Channel): void {
    this.selectedGroup = group;
    
    // If it's a regular group, we'll set the group node
    if (group.media_type === MediaType.group) {
      this.memory.SetGroupNode.next({
        id: group.id!,
        name: group.name!,
      });
    } 
    // If it's the "All channels" option
    else if (group.id === 0) {
      this.memory.Filters.next({
        ...this.memory.Filters.value,
        view_type: ViewMode.All,
        group_id: undefined,
        search: '',
        series_id: undefined
      });
    }
  }
  
  switchToFavorites(): void {
    this.memory.Filters.next({
      ...this.memory.Filters.value,
      view_type: ViewMode.Favorites,
      group_id: undefined,
      search: '',
      series_id: undefined
    });
  }
  
  private loadGroups(): void {
    // Add "All channels" as the first option
    this.groups = [
      { id: 0, name: 'All channels', media_type: MediaType.livestream },
      { id: 1, name: 'Group 1', media_type: MediaType.group },
      { id: 2, name: 'Group 2', media_type: MediaType.group },
      { id: 3, name: 'Group 3', media_type: MediaType.group },
      { id: 4, name: 'Group 4', media_type: MediaType.group },
      { id: 5, name: 'Group 5', media_type: MediaType.group },
      { id: 6, name: 'Group 6', media_type: MediaType.group }
    ];
  }
  
  private loadFavorites(): void {
    // Your actual implementation would pull from the memory service
    this.favorites = [
      { id: 101, name: 'Favorite 1', media_type: MediaType.livestream },
      { id: 102, name: 'Favorite 2', media_type: MediaType.livestream }
    ];
  }
} 