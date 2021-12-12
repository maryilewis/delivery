import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Network, Node, Edge } from 'vis-network';
import { DataSet } from 'vis-data';
import { GameService } from 'src/app/services/game.service';
import { GameData, RoadData, TownData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@ViewChild('mapElement', { static: false }) mapRef!: ElementRef;
		private networkInstance: Network;
		constructor(
			private gameService: GameService,
			private dataService: DataService,
			private selectService: SelectionService) {
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		// DISABLE DRAG TO SELECT
		const options = {
			interaction: {
				selectConnectedEdges: false,
				hoverConnectedEdges: false,
				dragNodes: false,
				tooltipDelay: 0,
			}
		}
		const container = this.mapRef;
		this.networkInstance = new Network(container.nativeElement, this.getMapData(), {});
		this.networkInstance.setOptions(options);
		this.networkInstance.on("select", this.handleSelectWithContext(this));
		this.gameService.currentGame$.subscribe({
			next: (game: GameData) => {
				// pay attention to whether roads have been built and current location changes
				this.networkInstance.setData(this.getMapData());
			}
		});
	}

	private handleSelectWithContext(context: MapComponent): {(click: any): void} {
		return (click) => {
			context.selectService.selectTownById(click.nodes[0]);
			context.selectService.selectedRoadById(click.edges[0]);
		}
	}

	private getMapData(): { nodes: DataSet<Node>, edges: DataSet<Edge> } {
		// create an array with nodes
		const nodes = new DataSet<Node>(this.townsToNodes());
		// create an array with edges
		const edges = new DataSet<Edge>(this.roadsToEdges());
		return { nodes, edges };
	}

	// need minimum node size
	private townsToNodes(): Node[] {
		return this.dataService.towns.map((town: TownData) => {
			// is node current location?
			const currentLocation = this.gameService.currentTownId === town.id;
			const node: Node = {
				label: `${town.name} \n${town.productIds.map(id => this.dataService.getProductById(id).name).join(", ")}${currentLocation ? '\nYou Are Here' : ''}`,
				x: town.x,
				y: town.y,
				fixed: true,
				id: town.id,
				color: currentLocation ? '#899fa3' : '#2d2f1e',
				font: {
					size: 16,
					face: 'Patrick Hand',
					color: 'white'
				},
				shape: 'box',
				physics: false,
				borderWidth: 1,
			};
			return node;
		});
	}

	private roadsToEdges(): Edge[] {
		return this.dataService.roads.map((road: RoadData) => {
			// is road built?
			const roadIsBuilt = this.gameService.isRoadBuilt(road.id);
			const edge: Edge = {
				from: road.townId1,
				to: road.townId2,
				id: road.id,
				dashes: roadIsBuilt ? false : true,
				width: 3,
				smooth: true,
				color: '#684726',
				physics: false,
				label: roadIsBuilt ? '' : `Build for $${road.cost}`,
				font: {
					size: 16,
					face: 'Patrick Hand',
				},
			};
			return edge;
		});
	}

}
